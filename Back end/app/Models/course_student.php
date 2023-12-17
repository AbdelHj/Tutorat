<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class course_student extends Model
{
    use HasFactory;
    protected $table = 'course_students';
    protected $fillable = [
        'id_student',
        'id_course',
        'progress'
    ];
}
