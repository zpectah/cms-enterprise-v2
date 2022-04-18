@if($member['actions']['lostPassword'])
    <main
        class="main view page-view page-view--lost-password"
    >
        @include('component.section-heading', [
            'title' => $t('page:lost-password.title'),
            'description' => $t('page:lost-password.description'),
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
    <div>
        Sorry, but this option is disabled
    </div>
@endif
