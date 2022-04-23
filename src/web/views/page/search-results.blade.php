<main
    class="main view page-view page-view--search-results"
>
    @if($member['actions']['search'])
        @include('shared.section.heading', [
            'pageTitle' => $t('page:search-results.title') . ' "' . $route['params']['search'] . '"',
            'pageDescription' => 'Found: ' . $search_results['count'],
        ])
        @include('shared.section.items', [
            'itemsList' => $search_results['results'],
            'context' => 'search',
        ])
    @if($search_results['count'] == 0)
            <section>
                {{$t('common:label.nothing_found')}}
            </section>
        @endif
    @else
        <div>
            Sorry, but this option is disabled
        </div>
    @endif
</main>