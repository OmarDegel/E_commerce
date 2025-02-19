<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'desc')->get();
        return response()->json(([
            'status' => 200,
            'brands' => $brands
        ]));
    }
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json(['status' => 400, 'errors' => $validate->errors()], 400);
        }
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();
        return response()->json(['status' => 200, 'message' => 'brand created successfully'], 200);
    }
    public function show($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            return response()->json(['status' => 404, 'message' => 'brand not found'], 404);
        }
        return response()->json(([
            'status' => 200,
            'brands' => $brand
        ]));
    }
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json(['status' => 400, 'errors' => $validate->errors()], 400);
        }
        $brand = Brand::find($id);
        if ($brand == null) {
            return response()->json(['status' => 404, 'message' => 'brand not found'], 404);
        }
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();
        return response()->json(['status' => 200, 'message' => 'brand updated successfully'], 200);
    }
    public function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            return response()->json(['status' => 404, 'message' => 'brand not found'], 404);
        }
        $brand->delete();
        return response()->json(['status' => 200, 'message' => 'brand deleted successfully'], 200);
    }
}
