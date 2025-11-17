const fs = require('fs/promises');

async function runProcess() {
  try {
    console.log('1. سأقوم بقراءة ملف المستخدم...');
    const userData = await fs.readFile('user.json', 'utf8');
    const user = JSON.parse(userData);
    console.log('تمت القراءة بنجاح.');
    console.log('المستخدم:', user);
    console.log('2. سأقوم بطلب البوستات من الـ API...');
    // التعديل المطلوب:
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
    const posts = await response.json(); // <-- استخدم .json() بدلاً من JSON.parse(body)
    // const posts = [{id: 1}, {id: 2}]; // بيانات وهمية
    console.log('تم جلب البوستات بنجاح.');

    console.log('3. سأقوم بكتابة ملف اللوج...');
    const logMessage = `تم العثور على ${posts.length} منشور.`;
    await fs.writeFile('app.log', logMessage);
    console.log('تمت كتابة ملف اللوج بنجاح!');

  } catch (err) {
    // أي خطأ هيحصل في أي await من اللي فاتوا هيتم التقاطه هنا
    console.error('حدث خطأ في العملية:', err);
  }
}

runProcess();
console.log('تم استدعاء دالة runProcess...');