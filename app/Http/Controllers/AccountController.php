<?php

namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function getAllAccounts()
    {
        $accounts = user::all();  // Get all accounts from the database
        return response()->json($accounts);  // Return as JSON
    }

    public function index(Request $request)
    {
        $searchTerm = $request->input('search', '');
        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');

        $accounts = User::query()
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query->where('username', 'like', "%$searchTerm%")
                    ->orWhere('id', 'like', "%$searchTerm%")
                    ->orWhere('course', 'like', "%$searchTerm%");
            })
            ->orderBy($sortField, $sortDirection)
            ->get();

        return view('accounts.index', compact('accounts'));
    }

    public function update(Request $request, $id)
    {
        $account = User::findOrFail($id);
        $account->update($request->all());

        return redirect()->route('accounts.index')->with('success', 'Account updated successfully');
    }

    public function destroy($id)
    {
        $account = User::findOrFail($id);
        $account->delete();

        return redirect()->route('accounts.index')->with('success', 'Account deleted successfully');
    }
}
