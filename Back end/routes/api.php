<?php

use App\Http\Controllers\course_student_controller;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/courses', [CoursesController::class, 'index']);
Route::post('/courses', [CoursesController::class, 'store']);
Route::get('/courses/{id}', [CoursesController::class, 'show']);
Route::get('/courses/instructor/{id}', [CoursesController::class, 'showByIdInstructor']);

Route::post('/courseUser', [course_student_controller::class, 'store']);
Route::get('/courseUser/course/{id}', [course_student_controller::class, 'showByIdCourse']);
Route::get('/courseUser/student/{id}', [course_student_controller::class, 'showByIdStudent']);
Route::post('/courseUser/update/{id_course}/{id_student}', [course_student_controller::class, 'update']);

Route::post('/activity', [ActivityController::class, 'store']);
Route::get('/activity/{id}', [ActivityController::class, 'show']);
Route::get('/activity/course/{id}', [ActivityController::class, 'showByIdCourse']);

Route::post('/question', [QuestionController::class, 'store']);
Route::get('/question/{id}', [QuestionController::class, 'show']);
Route::get('/question/activity/{id}', [QuestionController::class, 'showByIdActivity']);

Route::post('/answer', [AnswerController::class, 'store']);
Route::get('/answer/{id}', [AnswerController::class, 'show']);
Route::get('/answer/student/{id}', [AnswerController::class, 'showByStudentId']);
Route::get('/answer/question/{id}', [AnswerController::class, 'showByQuestionId']);
Route::get('/answer/question/{idCourse}/{idStudent}', [AnswerController::class, 'showByCourseIdAndStudentId']);

Route::get('/subject', [SubjectController::class, 'index']);
Route::post('/subject', [SubjectController::class, 'store']);

Route::get('/users', [UtilisateurController::class, 'index']);
Route::get('/users/type/{type}', [UtilisateurController::class, 'showByType']);
Route::get('/users/{id}', [UtilisateurController::class, 'show']);
Route::post('/users', [UtilisateurController::class, 'store']);
Route::post('/users/login', [UtilisateurController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
