# Error de Autenticación al Subir Cambios a GitHub (Error Commit / Push)

Este documento describe las causas del error de autenticación ocurrido al intentar subir la rama remota (`git push`) y los pasos seguidos para resolverlo mediante un **Personal Access Token (PAT)** en macOS.

---

## 1. El Error Presentado

Al ejecutar el comando para publicar la rama en GitHub:

```bash
git push -u origin feature/agregar-variables-de-entorno
```

La terminal arrojó el siguiente error:

```text
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/Repo-Test-QA/playwright_mentoria_AI/'
```

---

## 2. ¿Por qué ocurrió en primera instancia?

Existen dos motivos técnicos combinados que impidieron la subida:

1. **GitHub eliminó las contraseñas de cuenta para Git**:
   Desde agosto de 2021, GitHub desactivó de forma permanente la autenticación mediante la contraseña estándar de la cuenta para cualquier operación remota de Git (`git push`, `git pull`, `git clone` por HTTPS). En su lugar, es obligatorio utilizar un **Personal Access Token (PAT)** con permisos específicos o llaves SSH.

2. **El Llavero de macOS (`osxkeychain`) tenía una credencial obsoleta en caché**:
   En entornos Mac, Git utiliza el asistente `credential.helper=osxkeychain`. Al intentar hacer el `push`, el sistema operativo envió automáticamente una contraseña antigua o un token caducado que tenía guardado en el llavero, provocando el rechazo inmediato de GitHub antes de que pudieras ingresar nuevas credenciales.

> [!NOTE]
> El comando `git commit` sí funcionó correctamente porque es una operación 100% **local** (guarda los cambios en tu computadora). El fallo ocurrió en el `git push`, que es la operación de red encargada de sincronizar con los servidores remotos de GitHub.

---

## 3. Pasos que Resolvieron el Problema

### Paso 1: Limpiar la credencial obsoleta del Llavero de macOS
Se ejecutó en la terminal el siguiente comando para forzar al Llavero de Mac a olvidar la credencial antigua de GitHub:

```bash
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
```

---

### Paso 2: Generar un Personal Access Token (PAT) en GitHub
1. En GitHub, ingresa a **Settings** (foto de perfil) ➔ **Developer Settings** (menú inferior izquierdo).
2. Ve a **Personal access tokens** ➔ **Tokens (classic)**.
3. Haz clic en **Generate new token (classic)**.
4. Asigna un nombre descriptivo en *Note* (ej. `MacBook Playwright`) y selecciona una vigencia (*Expiration*).
5. Marca el permiso indispensable **`repo`** (Full control of private repositories).
6. Haz clic en **Generate token** y copia el token generado (empieza por `ghp_...`).

---

### Paso 3: Ejecutar el Push con el Token
Se ejecutó nuevamente la subida:

```bash
git push -u origin feature/agregar-variables-de-entorno
```

Al solicitar los datos:
- **Username:** Tu nombre de usuario de GitHub.
- **Password:** Se pegó el **Personal Access Token (`ghp_...`)**.

---

## 4. Resultado Exitoso

El Llavero de Mac almacenó el nuevo token de forma segura y la rama fue publicada exitosamente en el repositorio remoto:

```text
Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
Delta compression using up to 8 threads
Compressing objects: 100% (24/24), done.
Writing objects: 100% (25/25), 15.15 KiB | 7.58 MiB/s, done.
Total 25 (delta 11), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (11/11), completed with 11 local objects.
remote: 
remote: Create a pull request for 'feature/agregar-variables-de-entorno' on GitHub by visiting:
remote:      https://github.com/Repo-Test-QA/playwright_mentoria_AI/pull/new/feature/agregar-variables-de-entorno
remote: 
To https://github.com/Repo-Test-QA/playwright_mentoria_AI
 * [new branch]      feature/agregar-variables-de-entorno -> feature/agregar-variables-de-entorno
branch 'feature/agregar-variables-de-entorno' set up to track 'origin/feature/agregar-variables-de-entorno'.
```
