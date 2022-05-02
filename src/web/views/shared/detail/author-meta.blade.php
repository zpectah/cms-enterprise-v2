{{--
Detail author meta data
--}}
@if(isset($detail['detail']['__author']))
    <div class="shared-detail author-meta">
        <div
                class="hstack gap-2"
        >
            @if($detail['detail']['__author']['img_avatar'])
                @include('component.ui.image', [
                    'src' => $detail['detail']['__author']['img_avatar'],
                    'alt' => $detail['detail']['__author']['email'],
                    'className' => 'img-thumbnail rounded',
                    'style' => 'max-width: 100px; border-radius: 100% !important;',
                ])
            @endif
            <div>
                <dl class="ui-dl">
                    <dt class="ui-dt">{{$t('common:label.email')}}</dt>
                    <dd class="ui-dd">{{$detail['detail']['__author']['email']}}</dd>
                </dl>
                <dl class="ui-dl">
                    <dt class="ui-dt">{{$t('common:label.nickname')}}</dt>
                    <dd class="ui-dd">{{$detail['detail']['__author']['nickname']}}</dd>
                </dl>
                @if($detail['detail']['__author']['name_first'] && $detail['detail']['__author']['name_last'])
                    <dl class="ui-dl">
                        <dt class="ui-dt">{{$t('common:label.name')}}</dt>
                        <dd class="ui-dd">{{$detail['detail']['__author']['name_first']}} {{$detail['detail']['__author']['name_last']}}</dd>
                    </dl>
                @endif
                @if($detail['detail']['__author']['description'])
                    <dl class="ui-dl">
                        <dt class="ui-dt">{{$t('common:label.description')}}</dt>
                        <dd class="ui-dd">{{$detail['detail']['__author']['description']}}</dd>
                    </dl>
                @endif
            </div>
        </div>
    </div>
@endif