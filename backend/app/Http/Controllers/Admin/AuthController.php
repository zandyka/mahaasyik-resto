<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private const ADMIN_ID = 'akurajasunda';
    private const ADMIN_PASS = 'tetehsunda';

    public function showLogin()
    {
        if (session('admin_logged_in')) {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($request->username === self::ADMIN_ID && $request->password === self::ADMIN_PASS) {
            session(['admin_logged_in' => true, 'admin_name' => 'Admin Mahaasyik']);
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['login' => 'Username atau password salah!'])->withInput();
    }

    public function logout(Request $request)
    {
        $request->session()->forget(['admin_logged_in', 'admin_name']);
        return redirect()->route('admin.login');
    }
}
