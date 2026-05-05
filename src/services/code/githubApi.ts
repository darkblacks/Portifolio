/**
 * Serviço responsável por montar um raio-x público do GitHub.
 *
 * Usuário analisado:
 * darkblacks
 *
 * APIs usadas:
 * - GET https://api.github.com/users/{username}
 * - GET https://api.github.com/users/{username}/repos
 */

const GITHUB_USERNAME = "darkblacks";

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  archived: boolean;
  fork: boolean;
  updated_at: string;
  pushed_at: string | null;
  topics?: string[];
};

/**
 * Formata números grandes no padrão brasileiro.
 *
 * Exemplo:
 * 1234 -> 1.234
 */
function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

/**
 * Formata data ISO no padrão brasileiro.
 *
 * Exemplo:
 * 2026-05-05T12:00:00Z -> 05/05/2026
 */
function formatDate(value: string | null) {
  if (!value) return "Não informado";

  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}

/**
 * Retorna texto padrão quando a informação não existe.
 */
function fallback(value: string | null | undefined) {
  return value && value.trim() ? value : "Não informado";
}

/**
 * Busca dados públicos do perfil GitHub.
 */
async function fetchGitHubUser() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "Limite público da API do GitHub atingido. Tente novamente mais tarde."
      );
    }

    throw new Error("Não foi possível buscar o perfil do GitHub.");
  }

  return (await response.json()) as GitHubUser;
}

/**
 * Busca repositórios públicos do usuário GitHub.
 */
async function fetchGitHubRepositories() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "Limite público da API do GitHub atingido. Tente novamente mais tarde."
      );
    }

    throw new Error("Não foi possível buscar os repositórios do GitHub.");
  }

  return (await response.json()) as GitHubRepository[];
}

/**
 * Conta linguagens usadas nos repositórios.
 */
function getLanguageStats(repositories: GitHubRepository[]) {
  const languageMap = new Map<string, number>();

  repositories.forEach((repo) => {
    if (!repo.language) return;

    languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1);
  });

  return [...languageMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => `${language} (${count})`);
}

/**
 * Seleciona repositórios de destaque.
 *
 * Regra:
 * - ignora forks;
 * - ignora arquivados;
 * - prioriza stars;
 * - depois prioriza atualização recente.
 */
function getFeaturedRepositories(repositories: GitHubRepository[]) {
  return repositories
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, 5);
}

/**
 * Monta o raio-x do GitHub em linhas prontas para o terminal.
 */
export async function getDarkblacksGitHubOverview() {
  const [user, repositories] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepositories(),
  ]);

  const originalRepos = repositories.filter((repo) => !repo.fork);
  const archivedRepos = repositories.filter((repo) => repo.archived);

  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  const totalSizeKb = repositories.reduce((total, repo) => total + repo.size, 0);

  const languages = getLanguageStats(originalRepos);
  const featuredRepositories = getFeaturedRepositories(repositories);

  const mainLanguage = languages[0] ?? "Não informada";

  return [
    "PERFIL",
    `Usuário: ${user.login}`,
    `Nome: ${fallback(user.name)}`,
    `Bio: ${fallback(user.bio)}`,
    `Localização: ${fallback(user.location)}`,
    `Empresa: ${fallback(user.company)}`,
    `Site/Portfólio: ${fallback(user.blog)}`,
    `GitHub: ${user.html_url}`,
    `Criado em: ${formatDate(user.created_at)}`,
    `Atualizado em: ${formatDate(user.updated_at)}`,
    "",
    "ESTATÍSTICAS",
    `Repositórios públicos: ${formatNumber(user.public_repos)}`,
    `Repositórios analisados: ${formatNumber(repositories.length)}`,
    `Repositórios próprios: ${formatNumber(originalRepos.length)}`,
    `Repositórios arquivados: ${formatNumber(archivedRepos.length)}`,
    `Seguidores: ${formatNumber(user.followers)}`,
    `Seguindo: ${formatNumber(user.following)}`,
    `Stars totais: ${formatNumber(totalStars)}`,
    `Forks totais: ${formatNumber(totalForks)}`,
    `Tamanho total aproximado: ${formatNumber(totalSizeKb)} KB`,
    `Linguagem principal: ${mainLanguage}`,
    `Linguagens encontradas: ${
      languages.length > 0 ? languages.join(", ") : "Não informado"
    }`,
    "",
    "REPOSITÓRIOS EM DESTAQUE",
    ...featuredRepositories.flatMap((repo, index) => [
      `${index + 1}. ${repo.full_name}`,
      `Descrição: ${fallback(repo.description)}`,
      `Linguagem: ${fallback(repo.language)}`,
      `Stars: ${formatNumber(repo.stargazers_count)}`,
      `Forks: ${formatNumber(repo.forks_count)}`,
      `Atualizado em: ${formatDate(repo.updated_at)}`,
      `Último push: ${formatDate(repo.pushed_at)}`,
      `Link: ${repo.html_url}`,
      "",
    ]),
  ];
}