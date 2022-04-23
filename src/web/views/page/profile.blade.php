@if($member['actions']['profile_view'])
    <main class="main view page-view page-view--profile">
        @include('shared.section.heading', [
            'pageTitle' => $t('page:profile.title'),
            'pageDescription' => $t('page:profile.description'),
        ])
        <section class="section section--main">
            @if($member['actions']['profile_edit'])
                @include('component.profile-form')
            @else
                <article>
                    {{$member['profile']['email']}}
                    <br />
                    ...
                </article>
            @endif
        </section>
    </main>
@else
    @include('shared.section.error')
@endif
