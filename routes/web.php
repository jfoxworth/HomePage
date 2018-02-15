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
    return view('layouts.welcome');
});

Route::get('/profile', function () {
    return view('layouts.profile');
});

Route::get('/resume', function () {
    return view('layouts.resume');
});

Route::get('/bio', function () {
    return view('layouts.bio');
});

Route::get('/skills', function () {
    return view('layouts.skills');
});

Route::get('/contact', function () {
    return view('layouts.contact');
});
