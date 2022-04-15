@if($members['active'] && $members['members_lostPassword_active'])
    <main class="view page-view page-view--members-lost-password">
        @include('component.section-heading', [
            'title' => $t('page:members-lost-password.title'),
            'description' => $t('page:members-lost-password.description'),
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
