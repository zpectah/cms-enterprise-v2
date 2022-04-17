<main class="view page-view page-view--default">
    @include('component.section-heading', [
        'title' => $_page['title'],
        'description' => $_page['description'],
    ])
    @include('component.section-main', [ 'html' => $_page['content'] ])
</main>