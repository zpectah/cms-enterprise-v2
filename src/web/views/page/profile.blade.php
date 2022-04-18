@if($member['actions']['profile_view'])
    <main
        class="main view page-view page-view--profile"
    >
        @include('component.section-heading', [
            'title' => $t('page:profile.title'),
            'description' => $t('page:profile.description'),
        ])
        <section class="section section--main">
            @if($member['actions']['profile_edit'])
                <member-profile-form>Loading</member-profile-form>
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
    <div>
        Sorry, but this option is disabled
    </div>
@endif
