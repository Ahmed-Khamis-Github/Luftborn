<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }



    public function index(Request $request)
    {
        $products = Product::with('category')->paginate();

        $data = ProductResource::collection($products);

        return ApiResponse::sendResponse(200, 'Products Retrieved Successfully', $data);
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {

        $product = Product::create($request->validated());

        $data = new ProductResource($product);


        return ApiResponse::sendResponse(201, 'Product Created Successfully', $data);
    }




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $data =  new ProductResource($product);

        return ApiResponse::sendResponse(200, 'Product Retrieved Successfully', $data);
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {

        $product->update($request->validated());

        $data = new ProductResource($product);

        return ApiResponse::sendResponse(200, 'Product Updated Successfully', $data);
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        try {
            Product::destroy($id);
            return ApiResponse::sendResponse(200, 'Product deleted successfully');
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(404 , 'Failed to delete product');
        }
    }
}
