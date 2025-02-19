<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\ProductController as AdminProductController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\TempImageController;

Route::post('/admin/login', [AuthController::class, 'authentication']);
Route::get('get-latest-products', [FrontProductController::class, 'latestProducts']);
Route::get('get-featured-products', [FrontProductController::class, 'featuredProducts']);
Route::get('get-categories', [FrontProductController::class, 'getCategories']);
Route::get('get-brands', [FrontProductController::class, 'getBrands']);
Route::get('get-products', [FrontProductController::class, 'getProducts']);
Route::get('get-product/{id}', [FrontProductController::class, 'getProduct']);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('products', AdminProductController::class);
    Route::resource('sizes', SizeController::class);
    Route::resource('temp-images', TempImageController::class);
    Route::post('save-prduct-image', [AdminProductController::class, 'saveProductImage']);
    Route::post('update-default-image', [AdminProductController::class, 'updateDefaultImage']);
    
});
