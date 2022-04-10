<main class="view page-view page-view--category">
    @include('component.section-heading', [
        'title' => $_category['title'],
        'description' => $_category['description'],
    ])
    @include('component.section-main', [ 'html' => $_page['content'] ])
    @include('component.section-list', [
        'items' => $page['page']['category']['items'],
        'model' => $page['page']['category']['model'],
        'context' => 'category',
        'pageName' => $page['page']['page']['name'],
    ])
</main>