# คู่มือระบบและแผนการสาธิต TRAIN TMS (Full-Stack Manual)
> **ระบบบริหารจัดการและติดตามการฝึกอบรมพนักงานใหม่ (Dynamics Motion Co., Ltd.)**  
> รายวิชา System Analysis and Design (SA - ผศ.ดร. อรวรรณ เชาวลิต) & Business Information Systems (BIS - อ.ดร. เสาวลักษณ์ อร่ามพงศานุวัต)  
> ภาควิชาคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร

---

## 📌 1. ภาพรวมการพัฒนาและการอ้างอิง Proposal (ฉบับแก้ครั้งที่ 13)

โปรเจกต์นี้ได้รับการพัฒนาให้ตรงตามข้อกำหนดในเล่มเอกสารข้อเสนอโครงการ **`proposal_sa_bis_แก้ครั้งที่13.pdf`** ครบถ้วน 100%:

| หมวดหมู่ | ข้อกำหนดใน Proposal | การพัฒนาจริงในระบบ |
| :--- | :--- | :--- |
| **หน่วยงาน** | บริษัท ไดนามิกส์ โมชั่น จำกัด (IT & Digital Solution) | ระบบ Onboarding และ Training พนักงานใหม่ 60 วันแรก |
| **Actors** | 1. Trainee (พนักงานใหม่)<br>2. Trainer / BA (ผู้ฝึกสอน/พี่เลี้ยง)<br>3. HR (ฝ่ายทรัพยากรบุคคล) | แยกบทบาท สิทธิ์ และหน้าจอเมนูเฉพาะสำหรับแต่ละบทบาทอย่างชัดเจน |
| **Use Cases** | ครบทั้ง 16 Use Cases (UC-1 ถึง UC-16) | พัฒนาหน้าจอและ API รองรับครบทุก Use Case |
| **Business Rules** | กฎทางธุรกิจ BR-1 ถึง BR-4 | เขียน Business Logic ตรวจสอบระดับ Database และ Backend |
| **Database** | 11 ตารางตาม Data Dictionary + 2 ตารางเชื่อมโยง | รองรับทั้ง **SQLite (พร้อมรันทันทีไม่ต้องติดตั้งโปรแกรมเพิ่ม)** และ **MySQL** |

---

## 🔑 2. บัญชีผู้ใช้งานเริ่มต้นสำหรับทดสอบ (Default Accounts)

ระบบมาพร้อมปุ่ม **"1-Click Login"** ที่หน้า Login และแถบ **"สลับบทบาท"** ที่ด้านบนของทุกหน้า เพื่อความสะดวกรวดเร็วในการนำเสนออาจารย์:

| บทบาท (Role) | Username | Password | ชื่อ - นามสกุล | หน้าที่ในการสาธิต |
| :--- | :--- | :--- | :--- | :--- |
| **Trainee** | `TN001` | `pass1234` | นาย สมชาย สายโค้ด | ศึกษาบทเรียน, ดูสื่อวิดีโอ, ส่งงานแบบฝึกหัด, ดูผลคะแนน Rubric |
| **Trainee** (สำรอง) | `TN002` | `pass1234` | น.ส. วิภาวี มีทักษะ | ตัวอย่างพนักงานที่ผ่านครบทุกบทเรียนเพื่อดูรายงานสำเร็จ |
| **Trainer / BA** | `TR001` | `train123` | นาย วิชัย สอนดี | ตรวจให้คะแนน Rubric 3 ด้าน, จัดการคลังสื่อและโจทย์, กำหนดแผน Roadmap |
| **HR Admin** | `HR001` | `hrpass12` | นาง นภา ดูแลคน | จัดการบัญชีผู้ใช้, ระบบสนับสนุนการตัดสินใจ BR-2, ออกรายงานและพิมพ์ PDF/Excel |

---

## 🚀 3. วิธีเปิดใช้งานระบบ (How to Run)

### วิธีที่ 1: ดับเบิ้ลคลิกไฟล์เดียว (ง่ายที่สุด)
1. ดับเบิ้ลคลิกที่ไฟล์ **`start_project.bat`**
2. ระบบจะทำการตรวจสอบ Node.js, ติดตั้ง Dependencies อัตโนมัติ (ถ้ายังไม่มี), และสตาร์ทเซิร์ฟเวอร์
3. หน้าต่างเว็บเบราว์เซอร์จะเปิดขึ้นมาที่ **`http://localhost:5173`** ทันที

### วิธีที่ 2: รันผ่าน Terminal / Command Line
```bash
# 1. รันระบบทั้งหมดพร้อมกัน
npm start

# หรือแยกเปิด 2 หน้าต่าง:
# หน้าต่างที่ 1: Backend
cd backend && npm start

# หน้าต่างที่ 2: Frontend
cd frontend && npm run dev
```

---

## 📋 4. การตรวจสอบความสอดคล้องกับ 16 Use Cases

### กลุ่มที่ 1: การยืนยันตัวตนและการจัดการสิทธิ์
* **UC-1 : เข้าสู่ระบบ (Login):** ตรวจสอบ Username / Password จากตาราง `User` พร้อมจัดเก็บ Token และจำแนกตามบทบาท
* **UC-14 : จัดการผู้ใช้และสิทธิ (User Management):** หน้า `/hr/users` ฝ่ายบุคคลสามารถ เพิ่ม/แก้ไข/ลบ บัญชีผู้ใช้งานกลาง (`User` Supertype) พร้อมบันทึกลง Subtypes (`Trainee`, `TrainerBA`, `HR`) โดยอัตโนมัติ

### กลุ่มที่ 2: ฟังก์ชันสำหรับพนักงานใหม่ (Trainee)
* **UC-2 : ดูเส้นทางการเรียนรู้ (Training Roadmap):** หน้า `/trainee/roadmap` แสดงแผนการอบรม 60 วัน พร้อมเกณฑ์ปลดล็อกบทเรียน (BR-3)
* **UC-3 : ดูสื่อเรียนรู้และทำแบบฝึกหัด:** หน้า `/trainee/assignments` แสดงตัวเล่นวิดีโอ (YouTube / MP4) และเอกสารประกอบบทเรียนภายในหน้าจอเดียวกัน
* **UC-4 : ส่งงานและแบบฝึกหัด:** รองรับการส่งงานหลากหลายรูปแบบ ทั้งลิงก์ผลงาน, Source Code, Flowchart, หรือ GitHub
* **UC-5 : ดูคะแนน และ Feedback:** หน้า `/trainee/evaluations` แสดงคะแนน Rubric 3 ด้านและคำติชมจากพี่เลี้ยงแบบ Real-time
* **UC-6 : ส่งงานแก้ไขใหม่ (Resubmit):** ในกรณีที่งานได้สถานะ `Need_Revision` จะมีปุ่มให้กดส่งงานแก้ไขใหม่ พร้อมเพิ่มหมายเลข `Version_No` โดยไม่ลบประวัติเดิม

### กลุ่มที่ 3: ฟังก์ชันสำหรับผู้ฝึกสอน / พี่เลี้ยง (Trainer / BA)
* **UC-7 : จัดการคลังสื่อ (Material Management):** หน้า `/trainer/tasks` (แท็บ 1) เพิ่ม แก้ไข ลบ วิดีโอและเอกสารประกอบการสอน
* **UC-8 : จัดการคลังโจทย์ (Assignment Management):** หน้า `/trainer/tasks` (แท็บ 2) เพิ่ม แก้ไข ลบ แบบฝึกหัดมาตรฐาน กำหนดหมวดหมู่ ความยาก และ Deadline
* **UC-9 : กำหนดแผนการเรียนรู้และมอบหมายโจทย์:** หน้า `/trainer/trainees` สามารถคลิกกำหนด/ปรับแต่ง Roadmap ให้กับ Trainee แต่ละคน เลือกโจทย์และลำดับ Seq_No
* **UC-10 : ตรวจสอบและประเมินผลงาน:** หน้า `/trainer/evaluations` เปิดตรวจไฟล์งาน ปรับคะแนนผ่านแถบเลื่อน Rubric 3 ด้าน (1.00 – 4.00)
* **UC-11 & UC-12 : สรุปผลการฝึกอบรม & ให้ Feedback:** บันทึกข้อเสนอแนะ พร้อมสรุปผลการประเมินย้อนหลัง

### กลุ่มที่ 4: ฟังก์ชันสำหรับฝ่ายบุคคลและผู้บริหาร (HR Admin)
* **UC-13 : ดู Dashboard ภาพรวม:** หน้า `/hr/dashboard` และ `/trainer/dashboard` สรุปจำนวน Trainee, งานรอตรวจ, ความคืบหน้า และคะแนนเฉลี่ยทั้งระบบ
* **UC-15 : จัดทำ Probation Report:** หน้า `/hr/probation` เลือกรหัสพนักงาน ระบบจะดึง KPI Scorecard คะแนน 3 ด้านจริง พร้อม **"คำแนะนำจากระบบ (Recommendation)"** ตามกฎ BR-2
* **UC-16 : ส่งออก Probation Report:** มีปุ่ม **"พิมพ์ / บันทึกเป็น PDF"** (พร้อมหัวจดหมายบริษัท ไดนามิกส์ โมชั่น จำกัด และช่องลงลายมือชื่อ) และปุ่ม **"ส่งออก Excel (CSV)"**

---

## ⚖️ 5. การทำงานของ Business Rules (กฎเกณฑ์ทางธุรกิจ 4 ข้อ)

1. **BR-1 (เกณฑ์ผ่านการประเมิน Rubric):**  
   Trainee จะต้องได้คะแนนประเมินเฉลี่ยของแต่ละด้าน **ไม่ต่ำกว่า 2.00 คะแนน** (จากคะแนนเต็ม 4.00 คะแนน) ในทั้ง 3 ด้าน (Development Skill, Business Logic, Communication) หากมีด้านใดด้านหนึ่งได้คะแนน $< 2.00$ ระบบจะปรับสถานะเป็น `Need_Revision` (ต้องแก้ไข) ทันที
2. **BR-2 (การประเมินช่วง 2 เดือนแรกสำหรับทดลองงาน 4 เดือน):**  
   ระบบรวบรวมผลคะแนนช่วง Onboarding 60 วัน มาแสดงผลเป็น **Decision Support Card** ในหน้า `/hr/probation` เพื่อแนะนำว่าควรตัดสิน `Passed` (ผ่านทดลองงาน), `Extended` (ขยายเวลา 30 วัน) หรือ `Failed`
3. **BR-3 (การปลดล็อกบทเรียนตามลำดับ - Prerequisite Sequential Unlock):**  
   บทที่ 1 (`Seq_No = 1`) จะปลดล็อกให้เรียนได้เสมอ แต่บทที่ 2 เป็นต้นไปจะถูกล็อก (`🔒 Locked`) จนกว่างานในบทก่อนหน้าจะได้รับการตรวจและได้สถานะ `Passed`
4. **BR-4 (การควบคุมสิทธิ์ - Role-Based Access Control):**  
   เฉพาะบัญชีที่มีบทบาทเป็น Trainer/BA เท่านั้นที่มีสิทธิ์ตรวจให้คะแนนและบันทึก Feedback พนักงานใหม่ไม่สามารถแก้ไขคะแนนของตนเองได้

---

## 🗄️ 6. โครงสร้างฐานข้อมูล (13 Tables Architecture)

สามารถคลิกเมนู **"ตรวจฐานข้อมูล (13 Tables)"** (`/database`) บนหน้าเว็บเพื่อสลับดูข้อมูลจริงของทุกตาราง:
1. `User` (User_ID, Username, Password, User_Role) - Supertype
2. `Trainee` (Trainee_ID, User_ID, Name, Position, Start_Date, Skill_Level) - Subtype
3. `TrainerBA` (Trainer_ID, User_ID, Name, Position, Department) - Subtype
4. `HR` (Hr_ID, User_ID, Name, Position, Department) - Subtype
5. `LearningMaterial` (Material_ID, Title, Type, Description, Material_URL)
6. `Assignment` (Assignment_ID, Material_ID, Title, Description, Category, Difficulty_Level, Deadline)
7. `TrainingRoadmap` (Roadmap_ID, Trainee_ID, Trainer_ID, Title, Description, Start_Date, End_Date, Status)
8. `RoadmapItem` (Item_ID, Roadmap_ID, Assignment_ID, Seq_No, Status)
9. `Submission` (Submission_ID, Trainee_ID, Assignment_ID, Version_No, Submitted_At, Status)
10. `SubmissionFile` (File_ID, Submission_ID, File_Name, File_Type, File_Size, File_URL)
11. `Evaluation` (Evaluation_ID, Submission_ID, Trainer_ID, Development_Score, BusinessLogic_Score, Communication_Score, Status)
12. `Feedback` (Feedback_ID, Evaluation_ID, Feedback_Note, Created_At)
13. `ProbationReport` (Report_ID, Trainee_ID, Hr_ID, Status, Remark, Created_At)

> [!TIP]
> บนหน้าตรวจสอบฐานข้อมูลมีปุ่ม **"รีเซ็ตข้อมูลตั้งต้น (Reset Sample Data)"** ให้กดคืนค่าข้อมูลกลับสู่จุดเริ่มต้นได้ใน 1 วินาที เหมาะสำหรับการทดสอบนำเสนอซ้ำหลายรอบ

---

## 💻 7. วิธีพิมพ์คำสั่งดูข้อมูล, แก้ไข หรือลบในฐานข้อมูล (SQL & DBA Guide)

สามารถจัดการข้อมูลด้วยคำสั่ง SQL ได้ **2 ช่องทางหลัก**:

### ช่องทางที่ 1: ผ่านหน้าเว็บ TRAIN TMS โดยตรง (ง่ายที่สุด แนะนำ)
1. เปิดหน้าเว็บไปที่เมนู **"ฐานข้อมูล 13 ตาราง"** หรือเข้า `http://localhost:5173/database`
2. คลิกเลือกแท็บ **"2. พิมพ์คำสั่ง SQL สด (SQL Console & Editor)"**
3. มีปุ่มเทมเพลตคำสั่งตัวอย่างด้านขวา สามารถคลิกเพื่อดึงคำสั่งมาใช้งานได้ทันที หรือพิมพ์คำสั่งเองในช่องสีดำ
4. กดปุ่ม **"รันคำสั่ง SQL (Execute Query)"** เพื่อประมวลผลทันที

### ช่องทางที่ 2: ผ่านโปรแกรม DB Browser for SQLite (เครื่องมือ DBA)
1. ดับเบิ้ลคลิกไฟล์ **`open_database.bat`** ที่อยู่ในโฟลเดอร์โปรเจกต์
2. ไปที่แท็บ **"Execute SQL"**
3. พิมพ์คำสั่ง SQL ลงในช่องว่าง แล้วกดปุ่ม **Play (▶)** หรือกดแป้น **F5**
4. **สำคัญมาก:** เมื่อทำการ `UPDATE` หรือ `DELETE` เสร็จแล้ว ต้องกดปุ่ม **"Write Changes" (Ctrl + S)** ด้านบน เพื่อบันทึกข้อมูลลงไฟล์เสมอ (ป้องกันปัญหา Database Lock)

### รวมชุดคำสั่ง SQL พื้นฐานที่ใช้บ่อยในโปรเจกต์:

#### 1. คำสั่งดูข้อมูล (SELECT)
```sql
-- ดูข้อมูลบัญชีผู้ใช้ทั้งหมด
SELECT * FROM User;

-- ดูข้อมูลพนักงานฝึกอบรม (Trainee) พร้อมระดับทักษะ
SELECT Trainee_ID, Status, Skill_Level FROM Trainee;

-- ดูผลการประเมินคะแนน Rubric 3 มิติ (Development, Business, Communication)
SELECT Evaluation_ID, Submission_ID, Score_Dev, Score_Biz, Score_Comm, Total_Score, Evaluation_Result 
FROM Evaluation;

-- ค้นหาข้อมูลแบบเชื่อมโยง (JOIN) Trainee + User + Department
SELECT t.Trainee_ID, u.First_Name, u.Last_Name, d.Department_Name, t.Skill_Level, t.Status
FROM Trainee t
JOIN User u ON t.User_ID = u.User_ID
JOIN Department d ON t.Department_ID = d.Department_ID;
```

#### 2. คำสั่งแก้ไขข้อมูล (UPDATE)
```sql
-- แก้ไขระดับทักษะของ Trainee ID = 1 เป็น 'Intermediate'
UPDATE Trainee 
SET Skill_Level = 'Intermediate' 
WHERE Trainee_ID = 1;

-- แก้ไขสถานะการส่งงาน Submission ID = 1 เป็น 'Reviewed'
UPDATE Submission 
SET Status = 'Reviewed' 
WHERE Submission_ID = 1;

-- แก้ไขคะแนนการประเมินผล
UPDATE Evaluation 
SET Score_Dev = 3.50, Score_Biz = 3.20, Total_Score = 3.35, Evaluation_Result = 'Pass' 
WHERE Evaluation_ID = 1;
```

#### 3. คำสั่งลบข้อมูล (DELETE)
```sql
-- ลบประวัติการส่งงานทดสอบที่มี ID = 11
DELETE FROM Submission 
WHERE Submission_ID = 11;

-- ลบผลการประเมินทดสอบ
DELETE FROM Evaluation 
WHERE Evaluation_ID = 11;
```

#### 4. คำสั่งเพิ่มข้อมูล (INSERT)
```sql
-- เพิ่มแผนกใหม่
INSERT INTO Department (Department_Name, Description) 
VALUES ('Mobile App Development', 'ทีมพัฒนาแอปพลิเคชันมือถือ');
```

