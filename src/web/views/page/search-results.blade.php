<main
    class="main view page-view page-view--search-results"
>
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
            {{$t('common:label.nothing_found')}}
        </section>
    @endif
</main>