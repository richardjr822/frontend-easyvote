<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class VoterController extends Controller
{
    public function getStudentInfo(Request $request)
    {
        $user = auth::user();

        return response()->json([
            'name' => $user->name,
            'id' => $user->id,
            'course' => $user->course,
            'year' => $user->year_level ?? 'N/A',
            'section' => $user->section ?? 'N/A',
        ]);
    }
}
