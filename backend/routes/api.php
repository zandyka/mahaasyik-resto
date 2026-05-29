<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\DeliveryController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\Api\MidtransController;
use App\Http\Controllers\Api\HistoryController;

/*
|--------------------------------------------------------------------------
| API Routes — Mahaasyik Restaurant
|--------------------------------------------------------------------------
*/

// ── Menu Routes ─────────────────────────────────────────────────────────
Route::get('/menu-categories', [MenuController::class, 'categories']);
Route::get('/menus', [MenuController::class, 'index']);
Route::get('/menus/{id}', [MenuController::class, 'show']);

// ── Gallery Routes ───────────────────────────────────────────────────────
Route::get('/gallery', [GalleryController::class, 'index']);

// ── FAQ Routes ───────────────────────────────────────────────────────────
Route::get('/faqs', [FaqController::class, 'index']);

// ── Review Routes ────────────────────────────────────────────────────────
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);

// ── Promo Routes ─────────────────────────────────────────────────────────
Route::post('/promos/validate', [PromoController::class, 'validate']);

// ── Reservation Routes ────────────────────────────────────────────────────
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/{code}', [ReservationController::class, 'show']);
Route::get('/reservations/{code}/ticket', [ReservationController::class, 'downloadTicket']);
Route::delete('/reservations/{code}', [ReservationController::class, 'cancel']);

// ── Delivery Routes ───────────────────────────────────────────────────────
Route::post('/deliveries', [DeliveryController::class, 'store']);
Route::get('/deliveries/{code}', [DeliveryController::class, 'show']);

// ── Midtrans Webhook (no CSRF, no auth) ───────────────────────────────────
Route::post('/midtrans/notification', [MidtransController::class, 'notification']);

// ─── History Routes ───────────────────────────────────────────────────
Route::get('/history', [HistoryController::class, 'index']);
