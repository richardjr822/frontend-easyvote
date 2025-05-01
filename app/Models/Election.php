<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if your table name follows Laravel's naming convention)
    protected $table = 'elections';

    // Define the fillable attributes to protect against mass-assignment vulnerabilities
    protected $fillable = [
        'name',
        'description',
        'image_url',
        'status',
        'duration_hours',
        'voters_type',
    ];

    // Define relationships
    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }

    // Add a helper method to check if the election is ongoing
    public function isOngoing()
    {
        return $this->status === 'Ongoing';
    }

    // Optionally, cast the duration_hours to an integer
    protected $casts = [
        'duration_hours' => 'integer',
    ];
}
