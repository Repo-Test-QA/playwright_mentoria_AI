# Guía Paso a Paso: Desplegar / Subir Proyecto a GitHub

Esta guía contiene los pasos exactos para inicializar Git en tu proyecto local de Playwright (**TA-PW**) y vincularlo a tu nuevo repositorio de GitHub.

---

## 📋 Requisitos Previos
1. Tener [Git](https://git-scm.com/) instalado en tu equipo.
2. Tener una cuenta en [GitHub](https://github.com/) y haber creado un nuevo repositorio (vacío, sin README ni .gitignore iniciales).
3. Contar con la URL del repositorio remoto (ejemplo: `https://github.com/TU_USUARIO/TA-PW.git`).

---

## 🛠️ Paso 1: Configurar el archivo `.gitignore`

Antes de guardar o publicar tus archivos, es imprescindible omitir carpetas pesadas o temporales (`node_modules`, reportes, evidencias).

Verifica que en la raíz del proyecto exista el archivo `.gitignore` con el siguiente contenido:

```text
node_modules/
test-results/
playwright-report/
allure-results/
allure-report/
.env
*.log
```

---

## 🚀 Paso 2: Comandos para vincular y subir tu proyecto

Abre tu terminal en la carpeta de tu proyecto (`c:\AG\QA\TA-PW`) y ejecuta los siguientes comandos ordenadamente:

### 1️⃣ Inicializar el repositorio Git local
```bash
git init
```

### 2️⃣ Establecer la rama principal a `main`
```bash
git branch -M main
```

### 3️⃣ Agregar todos los archivos al área de preparación (Staging)
```bash
git add .
```

### 4️⃣ Crear el primer Commit (Guardado local)
```bash
git commit -m "feat: setup inicial de pruebas automatizadas con Playwright y POM"
```

### 5️⃣ Vincular el repositorio local con tu repositorio remoto de GitHub
> ⚠️ **Nota:** Reemplaza `https://github.com/TU_USUARIO/TU_REPOSITORIO.git` por el enlace real de tu repositorio.

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### 6️⃣ Subir los cambios a GitHub
```bash
git push -u origin main
```

---

## 🔍 Paso 3: Confirmación de subida exitosa

1. Dirígete a la página de tu repositorio en **GitHub** en el navegador.
2. Actualiza la página (`F5`).
3. Verifica que visualices todas tus carpetas ([pages](file:///c:/AG/QA/TA-PW/pages), [tests](file:///c:/AG/QA/TA-PW/tests), [docs](file:///c:/AG/QA/TA-PW/docs), etc.) y que la carpeta `node_modules` **NO** se haya subido.

---

## 📌 Flujo Futuro (Para guardar nuevos avances)

Cada vez que realices cambios o avances en tu código en el futuro (por ejemplo, después de aplicar refactorizaciones), ejecuta:

```bash
git add .
git commit -m "refactor: mejora de Page Objects y Custom Fixtures en Playwright"
git push
```

---

## ⚡ Ejecución interactiva de pruebas
Recuerda que para ejecutar la suite de pruebas localmente puedes usar:
```bash
npx playwright test --ui
```
