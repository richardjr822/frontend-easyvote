<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('elections', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Election name
            $table->text('description')->nullable(); // Election description
            $table->string('image_url')->nullable(); // Election image URL
            $table->enum('status', ['not started', 'ongoing', 'finished'])->default('not started'); // Election status
            $table->integer('duration_hours')->nullable(); // Duration in hours
            $table->enum('voters_type', ['all', 'bsit', 'bscs', 'bsemc'])->default('all'); // Eligible voters
            $table->timestamps(); // Created and updated timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('elections');
    }

};
