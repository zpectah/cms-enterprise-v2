@if($member['actions']['lostPassword'])
    <main class="main view page-view page-view--lost-password">
        @include('shared.section.heading', [
            'pageTitle' => $t('page:lost-password.title'),
            'pageDescription' => $t('page:lost-password.description'),
        ])
        <section class="section section--main">
            @if($member['lost_password_token'])
                <member-new-password-form
                    token="{{$member['lost_password_token']}}"
                >
                    Loading
                </member-new-password-form>
            @else
                <member-lost-password-form>Loading</member-lost-password-form>
            @endif
        </section>
    </main>
@else
    @include('shared.section.error')
@endif
