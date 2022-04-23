<main
    class="main view page-view page-view--default"
>
    @include('shared.section.heading', [
        'pageTitle' => $_page['title'],
        'pageDescription' => $_page['description'],
    ])
    @include('shared.section.main', [ 'html' => $_page['content'] ])
</main>