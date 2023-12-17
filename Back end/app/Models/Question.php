<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $table = 'questions';
    protected $fillable = [
        'idActivity',
        'question',
        'opt1',
        'opt2',
        'opt3',
        'opt4',
        'correctAnswer'
    ];
}
