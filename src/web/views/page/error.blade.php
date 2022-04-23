<main class="main view page-view page-view--error">
    @include('shared.section.heading', [
        'pageTitle' => $t('page:error-404.title'),
    ])
    <section class="section section--main">
        <p>
            {{$t('page:error-404.description')}}
        </p>
        <br /><br />
        <a
                href="{{$public['links']['home']}}"
        >
            {{$t('common:btn.return-home')}}
        </a>
    </section>
</main>