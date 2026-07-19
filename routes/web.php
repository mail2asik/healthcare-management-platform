<?php

use Illuminate\Support\Facades\Route;

// Catch-all route for the Vue SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');