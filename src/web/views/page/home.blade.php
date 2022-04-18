<main
    class="main view page-view page-view--home"
>
    @include('component.section-heading', [
        'title' => $t('page:home.title'),
        'description' => $t('page:home.description'),
    ])
    <section class="section section--main">
        <p>{{$t('page:home.paragraph.1')}}</p>
        <p>{{$t('page:home.paragraph.2')}}</p>
    </section>
    @include('component.section-list', [
        'items' => $getPosts($custom_data['homepage_posts']), // TODO #posts #category
        'model' => 'posts',
        'context' => 'detail',
    ])
    @include('component.section-company')
</main>