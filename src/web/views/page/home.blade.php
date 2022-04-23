<main
    class="main view page-view page-view--home"
>
    @include('shared.section.heading', [
        'pageTitle' => $t('page:home.title'),
        'pageDescription' => $t('page:home.description'),
    ])
    <section class="section section--main">
        <p>{{$t('page:home.paragraph.1')}}</p>
        <p>{{$t('page:home.paragraph.2')}}</p>
    </section>
    @include('shared.section.items', [
        'itemsList' => $getPosts($custom_data['homepage_posts']), // TODO #posts #category
        'model' => 'posts',
        'context' => 'detail',
    ])
    @include('shared.company')
</main>