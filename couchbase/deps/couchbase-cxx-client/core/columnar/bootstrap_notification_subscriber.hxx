/* -*- Mode: C++; tab-width: 4; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*
 *   Copyright 2020-Present Couchbase, Inc.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

#pragma once

#include "core/impl/bootstrap_error.hxx"

namespace couchbase::core::columnar
{

class bootstrap_notification_subscriber
{
public:
  virtual ~bootstrap_notification_subscriber() = default;
  virtual void notify_bootstrap_error(const core::impl::bootstrap_error& error) = 0;
  virtual void notify_bootstrap_success(const std::string& session_id) = 0;
};
} // namespace couchbase::core::columnar
