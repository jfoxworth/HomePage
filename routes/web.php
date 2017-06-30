<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.app');
});

Route::get('/resume', function () {
    return view('resume');
});

Route::get('/bio', function () {
    return view('bio');
});

Route::get('/skills', function () {
    return view('skills');
});
