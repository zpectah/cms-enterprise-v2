<main class="view page-view page-view--search-results">
    @include('component.section-heading', [
        'title' => $t('page:search-results.title') . ' "' . $route['params']['search'] . '"',
        'description' => 'Found: ' . $search_results['count'],
    ])
    @include('component.section-list', [
        'items' => $search_results['results'],
        'context' => 'search',
    ])
    @if($search_results['count'] == 0)
        <section>
            {{$t('common:text.nothing-was-found')}}
        </section>
    @endif
</main>