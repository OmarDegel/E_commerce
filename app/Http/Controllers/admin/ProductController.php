<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use App\Models\ProdeuctImage;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->with('productImages')->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        }
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/products/'), $imageName);
            $product->image = $imageName;
            $product->save();
        }



        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempId) {
                $tempImage = TempImage::find($tempId);

                $extArray = explode(".", $tempImage->name);
                $ext = end($extArray);

                $image = $product->id . "_" . time() . "." . $ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $image));

                // small
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 400);
                $img->save(public_path('uploads/products/small/' . $image));

                $productImage = new ProdeuctImage();
                $productImage->product_id = $product->id;
                $productImage->image = $image;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $image;
                    $product->save();
                }
            }
        }

        //sizes
        if (!empty($request->sizes)) {
            $sizes = is_array($request->sizes) ? $request->sizes : json_decode($request->sizes, true);
        
            if (!is_array($sizes)) {
                throw new \Exception("Sizes must be an array.");
            }
        
            foreach ($sizes as $size) {
                $productSize = new ProductSize();
                $productSize->product_id = $product->id;
                $productSize->size_id = $size;
                $productSize->save();
            }
        }
        
        dd($request->sizes);

        return response()->json([
            'status' => 200,
            'message' => 'Product added successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('productImages')->find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $product
        ], 200);
    }


    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'sku' => 'required|unique:products,sku,' . $id . ',id',
            'is_featured' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        }
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
        $product->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully'
        ], 200);
    }
    public function saveProductImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        }



        $image = $request->file('image');
        $imageName = $request->product_id . time() . '.' . $image->extension();


        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $image));

        // small
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->coverDown(400, 400);
        $img->save(public_path('uploads/products/small/' . $image));

        //insert

        $productImage = new ProdeuctImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

       

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'id' => $productImage->id,
            'image_url' => asset('uploads/temp/' . $imageName),
        ], 200);
    }
    public function updateDefaultImage(Request $request){
        $product=Product::find($request->product_id);
        $product->image=$request->image;
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Image updated successfully',
        ],200);
    }
}
