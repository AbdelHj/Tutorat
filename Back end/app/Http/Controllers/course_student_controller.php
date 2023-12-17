<?php

namespace App\Http\Controllers;

use App\Models\course_student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class course_student_controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return course_student::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByIdCourse($id)
    {
        return course_student::where('id_course', '=', $id)->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByIdStudent($id)
    {
        return course_student::where('id_student', '=', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_course
     * @param  int  $id_student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_course, $id_student)
    {
        $progress = $request->input('progress');
        DB::table('course_students')
            ->where('id_course', $id_course)
            ->where('id_student', $id_student)
            ->update(array('progress' => $progress));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
