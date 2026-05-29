<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuAdminController;
use App\Http\Controllers\Admin\CategoryAdminController;
use App\Http\Controllers\Admin\PromoAdminController;
use App\Http\Controllers\Admin\ReservationAdminController;
use App\Http\Controllers\Admin\DeliveryAdminController;
use App\Http\Controllers\Admin\ReviewAdminController;

Route::get('/', function () {
    return file_get_contents(public_path('build/index.html'));
});

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────
Route::get('/admin', fn() => redirect()->route('admin.dashboard'));
Route::get('/admin/login',  [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout',[AuthController::class, 'logout'])->name('admin.logout');

// ─── ADMIN PROTECTED ROUTES ───────────────────────────────────────────────────
Route::middleware('admin.auth')->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Menus CRUD
    Route::get('/menus',              [MenuAdminController::class, 'index'])->name('menus.index');
    Route::get('/menus/create',       [MenuAdminController::class, 'create'])->name('menus.create');
    Route::post('/menus',             [MenuAdminController::class, 'store'])->name('menus.store');
    Route::get('/menus/{menu}/edit',  [MenuAdminController::class, 'edit'])->name('menus.edit');
    Route::put('/menus/{menu}',       [MenuAdminController::class, 'update'])->name('menus.update');
    Route::delete('/menus/{menu}',    [MenuAdminController::class, 'destroy'])->name('menus.destroy');

    // Categories CRUD
    Route::get('/categories',                   [CategoryAdminController::class, 'index'])->name('categories.index');
    Route::get('/categories/create',            [CategoryAdminController::class, 'create'])->name('categories.create');
    Route::post('/categories',                  [CategoryAdminController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}/edit',   [CategoryAdminController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category}',        [CategoryAdminController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}',     [CategoryAdminController::class, 'destroy'])->name('categories.destroy');

    // Promos CRUD
    Route::get('/promos',              [PromoAdminController::class, 'index'])->name('promos.index');
    Route::get('/promos/create',       [PromoAdminController::class, 'create'])->name('promos.create');
    Route::post('/promos',             [PromoAdminController::class, 'store'])->name('promos.store');
    Route::get('/promos/{promo}/edit', [PromoAdminController::class, 'edit'])->name('promos.edit');
    Route::put('/promos/{promo}',      [PromoAdminController::class, 'update'])->name('promos.update');
    Route::delete('/promos/{promo}',   [PromoAdminController::class, 'destroy'])->name('promos.destroy');
    Route::patch('/promos/{promo}/toggle', [PromoAdminController::class, 'toggle'])->name('promos.toggle');

    // Reservations
    Route::get('/reservations/calendar',      [ReservationAdminController::class, 'calendar'])->name('reservations.calendar');
    Route::get('/reservations/calendar-data', [ReservationAdminController::class, 'calendarData'])->name('reservations.calendar-data');
    Route::get('/reservations',               [ReservationAdminController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/{reservation}', [ReservationAdminController::class, 'show'])->name('reservations.show');
    Route::patch('/reservations/{reservation}/status', [ReservationAdminController::class, 'updateStatus'])->name('reservations.update-status');

    // Deliveries
    Route::get('/deliveries',              [DeliveryAdminController::class, 'index'])->name('deliveries.index');
    Route::get('/deliveries/{delivery}',   [DeliveryAdminController::class, 'show'])->name('deliveries.show');
    Route::patch('/deliveries/{delivery}/status', [DeliveryAdminController::class, 'updateStatus'])->name('deliveries.update-status');

    // Reviews
    Route::get('/reviews',                    [ReviewAdminController::class, 'index'])->name('reviews.index');
    Route::post('/reviews',                   [ReviewAdminController::class, 'store'])->name('reviews.store');
    Route::put('/reviews/{review}',           [ReviewAdminController::class, 'update'])->name('reviews.update');
    Route::patch('/reviews/{review}/toggle',  [ReviewAdminController::class, 'toggle'])->name('reviews.toggle');
    Route::delete('/reviews/{review}',        [ReviewAdminController::class, 'destroy'])->name('reviews.destroy');
});
