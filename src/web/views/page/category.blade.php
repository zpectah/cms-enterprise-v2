<main class="main view page-view page-view--category">
    @include('shared.section.heading', [
        'pageTitle' => $_page['title'],
        'pageDescription' => $_page['description'],
    ])
    @include('shared.section.main', [ 'html' => $_page['content'] ])
    @include('shared.section.items', [
        'itemsList' => $page['page']['category']['items'],
        'model' => $page['page']['category']['model'],
        'context' => 'category',
        'pageName' => $page['page']['page']['name'],
    ])
    @include('shared.section.comments', [
        'assigned' => 'Categories',
        'assignedId' => $page['page']['category']['data']['id'],
    ])
</main>