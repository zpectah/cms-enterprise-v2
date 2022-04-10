<main class="view page-view page-view--search-results">
    @include('component.section-heading', [
        'title' => $t('page:search-results.title') . ' "' . $route['params']['search'] . '"',
    ])
    @include('component.section-list', [
        'items' => $search_results,
        'context' => 'search',
    ])
</main>