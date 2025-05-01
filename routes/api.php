<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ElectionController;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello from Laravel']);
});
Route::get('/test-users', function () {
    return User::all();
});

/*Log In*/
//Route::middleware('auth:sanctum')->get('/student-info', [VoterController::class, 'getStudentInfo']); // voter controller
// Route::get('/api/accounts', [AccountController::class, 'getAllAccounts']); // account controller

Route::post('/login', [AuthController::class, 'login'] );
Route::post('/login', function (Request $request) {
    $credentials = $request->only('username', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        // Optional: Check if role matches
        if ($user->role !== $request->role) {
            Auth::logout(); // log out if role doesn't match
            return response()->json(['message' => 'Invalid role'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'name' => $user->name,  // Return the user's name
                'role' => $user->role,  // Optionally, return the user's role
                'id' => $user->id,      // Optionally, return the user's ID
            ]
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
});

/*Log Out*/
Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logged out']);
});

/*Admin*/
Route::get('/amindasboard', function () {
    return response()->json(['message' => 'Welcome to Log In']);
});

//Create
Route::post('/candidates', [CandidateController::class, 'store']);

//Manage Election
Route::get('/election/status', [ElectionController::class, 'getStatus']);
Route::post('/election/start', [ElectionController::class, 'startElection']);
Route::post('/elections', [ElectionController::class, 'storeElection']);