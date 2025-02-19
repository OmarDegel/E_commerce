<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ], 400);
        }

        $tempImage = new TempImage();
        $tempImage->name = $request->name;
        $tempImage->save();

        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        $manager=new ImageManager(Driver::class);
        $image = $manager->read(public_path('uploads/temp/' . $imageName));
        $image->coverDown(400, 450);
        $image->save(public_path('uploads/temp/thumb/' . $imageName));

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'id' => $tempImage->id, 
            'image_url' => asset('uploads/temp/' . $imageName),
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
