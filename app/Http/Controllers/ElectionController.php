<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;

class ElectionController extends Controller
{
    public function getStatus()
    {
        // Return current election status (could be from the database)
        $elections = Election::all();
        return response()->json($elections);
    }

    public function startElection(Request $request)
    {
        // Start the election based on the submitted data
        $election = Election::find($request->election_id);
        $election->status = 'Ongoing';
        $election->start_time = now();
        $election->save();

        return response()->json(['message' => 'Election started successfully']);
    }

    // Store Election Settings
    public function storeElection(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'status' => 'nullable|string|in:upcoming,ongoing,finished',
            'duration_hours' => 'required|integer|min:1|max:168', // Validate duration
            'voters_type' => 'required|string|in:all,bsit,bscs,bsemc', // Validate voters type
        ]);

        // Create a new election record
        $election = Election::create($validated);

        // Return the created election record as a response
        return response()->json($election, 201);
    }
}

