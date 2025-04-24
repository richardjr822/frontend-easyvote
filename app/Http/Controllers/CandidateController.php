<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidate;

class CandidateController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'partylist' => 'required|string|max:255',
            'platform' => 'required|string',
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('candidate_photos', 'public');
        } else {
            $photoPath = null;
        }

        // Store the candidate in the database
        $candidate = Candidate::create([
            'name' => $validatedData['name'],
            'position' => $validatedData['position'],
            'partylist' => $validatedData['partylist'],
            'photo' => $photoPath,
        ]);

        return response()->json(['message' => 'Candidate created successfully', 'candidate' => $candidate], 201);
    }

}
