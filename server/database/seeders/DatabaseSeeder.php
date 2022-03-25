<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleTableSeeder::class);
        $this->call(ScreenTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(RoleAccessTableSeeder::class);
        $this->call(ITTypeTableSeeder::class);
        $this->call(ExamTableSeeder::class);
        $this->call(QuestionTableSeeder::class);
        $this->call(AnswerTableSeeder::class);
        $this->call(ExamPointTableSeeder::class);
        $this->call(VocabularyTableSeeder::class);
        $this->call(ClassroomTableSeeder::class);
        $this->call(ClassMemberTableSeeder::class);
        $this->call(VocabularyITType::class);
        $this->call(ClassITTypeTableSeeder::class);
        $this->call(RankingTableSeeder::class);
        $this->call(PaymentTableSeeder::class);
        $this->call(UserPaymentTableSeeder::class);
        $this->call(LessonTableSeeder::class);
    }
}
