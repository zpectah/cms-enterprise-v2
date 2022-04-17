@if($detail['detail']['__author'])
    <section
        class="section section--author"
    >
        <div
            class="hstack gap-2"
        >
            @if($detail['detail']['__author']['img_avatar'])
                <img
                    src="{{$detail['detail']['__author']['img_avatar']}}"
                    alt="{{$detail['detail']['__author']['email']}}"
                    class="img-fluid img-thumbnail rounded"
                    style="max-width: 100px; border-radius: 100% !important;"
                    loading="lazy"
                />
            @endif
            <div>
                <dl>
                    <dt>{{$t('common:label.email')}}</dt>
                    <dd>{{$detail['detail']['__author']['email']}}</dd>
                </dl>
                <dl>
                    <dt>{{$t('common:label.nickname')}}</dt>
                    <dd>{{$detail['detail']['__author']['nickname']}}</dd>
                </dl>
                @if($detail['detail']['__author']['name_first'] && $detail['detail']['__author']['name_last'])
                    <dl>
                        <dt>{{$t('common:label.name')}}</dt>
                        <dd>{{$detail['detail']['__author']['name_first']}} {{$detail['detail']['__author']['name_last']}}</dd>
                    </dl>
                @endif
                @if($detail['detail']['__author']['description'])
                    <dl>
                        <dt>{{$t('common:label.description')}}</dt>
                        <dd>{{$detail['detail']['__author']['description']}}</dd>
                    </dl>
                @endif
            </div>
        </div>
    </section>
@endif
