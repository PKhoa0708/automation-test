$jars = Get-ChildItem -Path "$env:USERPROFILE\.m2\repository" -Recurse -Filter "*.jar" | Where-Object { $_.FullName -notmatch "guava\\19\.0" } | Select-Object -ExpandProperty FullName
$cp = $jars -join ';'
New-Item -ItemType Directory -Force -Path "target\classes" | Out-Null
& "C:\Program Files\Java\jdk-17\bin\javac.exe" -encoding UTF-8 -cp $cp -d "target\classes" "src\main\java\com\automation\Lesson1_1_ArchitectureTest.java"
& "C:\Program Files\Java\jdk-17\bin\java.exe" -cp "target\classes;$cp" com.automation.Lesson1_1_ArchitectureTest
