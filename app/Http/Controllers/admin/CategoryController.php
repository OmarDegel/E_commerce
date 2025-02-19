<?php

namespace App\Http\Controllers\admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->get();
        return response()->json(([
            'status' => 200,
            'categories' => $categories
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
        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json(['status' => 200, 'message' => 'Category created successfully'], 200);
    }
    public function show($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            return response()->json(['status' => 404, 'message' => 'Category not found'], 404);
        }
        return response()->json(([
            'status' => 200,
            'categories' => $category
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
        $category = Category::find($id);
        if ($category == null) {
            return response()->json(['status' => 404, 'message' => 'Category not found'], 404);
        }
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json(['status' => 200, 'message' => 'Category updated successfully'], 200);
    }
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            return response()->json(['status' => 404, 'message' => 'Category not found'], 404);
        }
        $category->delete();
        return response()->json(['status' => 200, 'message' => 'Category deleted successfully'], 200);
    }
}
