// Vite resuelve de forma automática la URL base de GitHub Pages.
// Ejemplo: github.com/usuario/Simulacion -> /Simulacion/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isProjectPage = repoName && !repoName.toLowerCase().endsWith('.github.io');

export default {
  base: process.env.GITHUB_ACTIONS === 'true' && isProjectPage
    ? `/${repoName}/`
    : '/',
};
