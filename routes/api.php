<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::namespace('App\Http\Controllers\API_Pessoas')->group(function(){

    Route::get('/Pessoas',  'PessoasController@index')->name('api.index_pessoas');
    Route::get('/Pessoas/{id}', 'PessoasController@show')->name('api.show_pessoas');
    Route::post('/Pessoas', 'PessoasController@store')->name('api.store_pessoas');
    Route::put('/Pessoas', 'PessoasController@update')->name('api.update_pessoas');
    Route::delete('/Pessoas', 'PessoasController@delete')->name('api.delete_pessoas');

});

Route::namespace('App\Http\Controllers\API_Vagas')->group(function(){

    Route::get('/Vagas',  'VagasController@index')->name('api.index_vagas');
    Route::get('/Vagas/{id}', 'VagasController@show')->name('api.show_vagas');
    Route::post('/Vagas', 'VagasController@store')->name('api.store_vagas');
    Route::put('/Vagas', 'VagasController@update')->name('api.update_vagas');
    Route::delete('/Vagas', 'VagasController@delete')->name('api.delete_vagas');

});

Route::namespace('App\Http\Controllers\API_Candidaturas')->group(function(){
    Route::prefix('Candidaturas')->group(function () {

        Route::get('/',  'CandidaturasController@index')->name('api.index_candidaturas');
        Route::get('/{id}', 'CandidaturasController@show')->name('api.show_candidaturas');
        Route::post('/', 'CandidaturasController@store')->name('api.store_candidaturas');
        Route::put('/', 'CandidaturasController@update')->name('api.update_candidaturas');
        Route::delete('/', 'CandidaturasController@delete')->name('api.delete_candidaturas');

    });
});


//Route::prefix('Ranking')->group(function () {

Route::get('/vagas/{id}/candidaturas/ranking', [App\Http\Controllers\API_Ranking\RankingController::class, 'index'])->name('api.index_vagas_candidaturas_ranking');

//});

