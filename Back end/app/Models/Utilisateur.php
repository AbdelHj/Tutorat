<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;
    protected $table = 'utilisateurs';
    protected $fillable = [
        'firstName',
        'lastName',
        'address',
        'city',
        'zip',
        'country',
        'bio',
        'email',
        'password',
        'type'
    ];
}
