using System;
using System.Diagnostics;
using System.IO;

public class PythonExecutor
{
    public static string RunPythonScript(string scriptPath, string arguments = "")
    {
        // مسیر مفسر پایتون را مشخص کنید
        string pythonPath = "python"; // اگر پایتون در PATH سیستم نصب است
        // در صورت نیاز مسیر کامل به مفسر پایتون را به صورت زیر بدهید:
        // string pythonPath = @"C:\Python39\python.exe";

        // بررسی وجود اسکریپت پایتون
        if (!File.Exists(scriptPath))
        {
            throw new FileNotFoundException($"The Python script at path '{scriptPath}' does not exist.");
        }

        var start = new ProcessStartInfo
        {
            FileName = pythonPath,
            Arguments = $"\"{scriptPath}\" \"{arguments}\"", // ارسال مسیر اسکریپت و آرگومان‌ها
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        try
        {
            using var process = Process.Start(start);
            if (process == null)
            {
                throw new InvalidOperationException("Failed to start Python process.");
            }

            // خواندن خروجی استاندارد
            string output = process.StandardOutput.ReadToEnd();
            string error = process.StandardError.ReadToEnd();

            process.WaitForExit();

            // مدیریت خطاها
            if (process.ExitCode != 0)
            {
                throw new Exception($"Python script returned error: {error}");
            }

            // در صورت عدم وجود خطا، خروجی استاندارد را باز می‌گردانیم
            return output;
        }
        catch (Exception ex)
        {
            // مدیریت استثناها
            throw new InvalidOperationException($"Error executing Python script: {ex.Message}", ex);
        }
    }
}
