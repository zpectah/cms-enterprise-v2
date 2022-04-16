<main class="view page-view page-view--home">
    @include('component.section-heading', [
        'title' => $t('page:home.title'),
        'description' => $t('page:home.description'),
    ])
    <section class="section section--main">
        <p>{{$t('page:home.paragraph.1')}}</p>
        <p>{{$t('page:home.paragraph.2')}}</p>
    </section>
    @include('component.section-list', [
        'items' => $get_posts([ 'category_id' => 1, 'limit' => 5 ]),
        'model' => 'posts',
        'context' => 'detail',
    ])
    @include('component.section-company')
</main>